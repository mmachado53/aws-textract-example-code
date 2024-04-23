
export enum Fileds {
    MemberName = 'MemberName',
    SubscriberName = 'SubscriberName',
    MemberRelationship = 'MemberRelationship',
    EffectiveDate = 'EffectiveDate',
    InsuranceCarrierName = 'InsuranceCarrierName',
    GroupId = 'GroupId',
    MemberIdNumber = 'MemberIdNumber',
    PlanName = 'PlanName',
    PayorName = 'PayorName',
    PayorIdNumber = 'PayorIdNumber',
    RxBIN = 'RxBIN',
    RxPCN = 'RxPCN',
    RxGRP = 'RxGRP'
  }

  export type QueriesAndAnswers = {
    queries:{ [key: string]: string[] },
    answers:  { [key: string]: string }
  }