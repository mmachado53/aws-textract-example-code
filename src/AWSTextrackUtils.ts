import { AnalyzeDocumentCommand, AnalyzeDocumentCommandInput, FeatureType, TextractClient } from "@aws-sdk/client-textract";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Fileds, QueriesAndAnswers } from "./models";

const credentials = fromCognitoIdentityPool({
    clientConfig:{region:'us-west-2'},
    identityPoolId:'us-west-2:d0b510fd-9b21-4e6d-877b-b64631d8eae0'
  });
const textractClient = new TextractClient({region:'us-west-2', credentials});

const buildAnalyzeDocumentCommandInputFromuint8Array = (uint8Array: Uint8Array):AnalyzeDocumentCommandInput=>{
  return { Document: {
    Bytes: uint8Array
  },
  FeatureTypes: [ 
  FeatureType.QUERIES
  ],
  QueriesConfig: {
    Queries: [
      {
        Text: "What is the member name?",
        Alias: Fileds.MemberName
      },
      {
        Text: "What is the subscriber name?",
        Alias: Fileds.SubscriberName
      },
      { 
        Text: "What is the relationship?",
        Alias: Fileds.MemberRelationship
      },
      {
        Text: "What is the effective date?",
        Alias: Fileds.EffectiveDate
      },
      {
        Text: "What is the insurance carrier name?",
        Alias: Fileds.InsuranceCarrierName
      },
      {
        Text: "What is the group id?",
        Alias: Fileds.GroupId
      },
      {
        Text: "What is the member id?",
        Alias: Fileds.MemberIdNumber
      },
      {
        Text: "What is the plan name?",
        Alias: Fileds.PlanName
      },
      {
        Text: "What is the payor name?",
        Alias: Fileds.PayorName
      },
      {
        Text: "What is the payor id number?",
        Alias: Fileds.PayorIdNumber
      },
      {
        Text: "What is the RxBIN number?",
        Alias: Fileds.RxBIN
      },
      {
        Text: "What is the RxPCN number?",
        Alias: Fileds.RxPCN
      },
      {
        Text: "What is the RxGRP number?",
        Alias: Fileds.RxGRP
      },
    ],
  }
};
}

export const analyzeDocument = (uint8Array: Uint8Array): Promise<QueriesAndAnswers>=> {
  return new Promise((resolve, reject) => {
    const input = buildAnalyzeDocumentCommandInputFromuint8Array(uint8Array);
    const command = new AnalyzeDocumentCommand(input);
    textractClient.send(command).then((result)=>{

      const queryesAndResults: QueriesAndAnswers = {queries: {}, answers:{}};
      result.Blocks?.forEach((item)=>{
        if(item.BlockType === 'QUERY' && item.Query && item.Query.Alias){
          const alias = item.Query.Alias;
          const answerIds = (item.Relationships?.find((relationship)=> relationship.Type === 'ANSWER' && relationship.Ids))?.Ids;
          queryesAndResults.queries[alias] = answerIds || [];
        }else if(item.BlockType === 'QUERY_RESULT' && item.Text && item.Id){
          const id = item.Id
          queryesAndResults.answers[id] =item.Text;
        }
      })
      resolve(queryesAndResults);
    }).catch((error)=> {
      console.error({error})
      reject(error);
    });
  });
}