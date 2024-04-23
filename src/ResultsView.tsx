import { Fileds, QueriesAndAnswers } from "./models"

const resultsTemplate = [
    {
        sectionName: 'General Fields',
        fields: [
            {label: 'Member Name:', field:  Fileds.MemberName},
            {label: 'Subscriber’s Name:', field:  Fileds.SubscriberName},
            {label: 'Member’s relationship to Subscriber:', field:  Fileds.MemberRelationship},
            {label: 'Effective Date:', field:  Fileds.EffectiveDate},
        ]
    },
    {
      sectionName: 'Medical Insurance',
      fields: [
          {label: 'Insurance carrier name:', field:  Fileds.InsuranceCarrierName},
          {label: 'Group ID number:', field:  Fileds.GroupId},
          {label: 'Member ID number:', field:  Fileds.MemberIdNumber},
          {label: 'Plan Name:', field:  Fileds.PlanName},
          {label: 'Payor Name:', field:  Fileds.PayorName},
          {label: 'Payor ID Number:', field:  Fileds.PayorIdNumber},
      ]
  },
  {
    sectionName: 'Pharmacy Insurance',
    fields: [
        {label: 'RxBIN number:', field:  Fileds.RxBIN},
        {label: 'RxPCN number:', field:  Fileds.RxPCN},
        {label: 'RxGRP number:', field:  Fileds.RxGRP}
    ]
}
];

const getResultFromField = (field: Fileds, queriesAndResults : QueriesAndAnswers): string =>  {
  return queriesAndResults.queries[field].reduce((prev, current) => {
    return `${prev} ${queriesAndResults.answers[current]}`;
  }, '');
}
function ResultsView(props: {
    queriesAndResults : QueriesAndAnswers, 
    imageURL : string
}){

   const {queriesAndResults, imageURL} = props;
    return (<div>
        <h1>
         Results
        </h1>
        <img style={{ maxHeight:'300px' }} src={imageURL}/>
        { resultsTemplate.map( (section) => {
         return ( <div key={section.sectionName}>
         <h2>
            {section.sectionName}
          </h2>
          {section.fields.map(field => {
            return (
            <div key={field.label}>
              <span>{getResultFromField(field.field, queriesAndResults).length > 0 && (<>&#9989; </>) } </span>
              <span style={{ fontWeight: 'bold', paddingRight:'12px' }}>{field.label}</span>
              <span style={{ textDecoration: 'underline' }}>{getResultFromField(field.field, queriesAndResults) || '***'}</span>   
              <br/>
              <br/>
              <br/>
            </div>
            )})}
         </div>)
        })}
        </div>)
}

export default ResultsView

