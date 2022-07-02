


export class UserInfo {
  public pictuerUrl: string| undefined;
  constructor(
    public readonly userName: string,
    public readonly loginId: string
  ) {

  }
}

export enum PageState {
  '開團' = 'openGroup',
  '使用說明' = 'help',
  '關於輕鬆開好團' = 'info',
  '聯絡我們' = 'mail'
}