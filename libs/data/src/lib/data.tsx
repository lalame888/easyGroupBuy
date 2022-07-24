

export class Cloneable {
  public clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}




export class UserInfo extends Cloneable {
  public pictuerUrl: string| undefined;
  constructor(
    public readonly userName: string,
    public readonly loginId: string
  ) {
    super();
  }
}

export enum PageState {
  '開團' = 'openGroup',
  '使用說明' = 'help',
  '關於輕鬆開好團' = 'info',
  '聯絡我們' = 'mail'
}

export type ChildPage = {
  pageName: '開新團'|
  '跟新團'|
  '目前團單'|
  '歷史團單'|
  '儲存商家'|
  '使用說明'|
  '聯絡我們'|
  '關於輕鬆開好團';
  page: string
}

export function getChildPageMenu(pageState: PageState): ChildPage[] {
  switch(pageState) {
    case PageState['開團']:
      return [
        {pageName: '開新團',page: 'NewOpen'},
        {pageName: '跟新團',page: 'JoinNew'},
        {pageName: '目前團單',page: 'NowGroup'},
        {pageName: '歷史團單',page: 'HistoryGroup'},
        {pageName: '儲存商家',page: 'StroeStore'}
      ];
    case PageState['使用說明']:
      return [
        {pageName: '使用說明',page: 'HelpPage'}
      ]
    case PageState['聯絡我們']:
    return [
      {pageName: '聯絡我們',page:'ContactUsPage'}
    ]
    case PageState['關於輕鬆開好團']:
    return [
      {pageName: '關於輕鬆開好團', page: 'Introduction'}
    ]
  }
}

export const THEME = {
  broder: '1px solid #489A81',
  buttonBorderRadius: '30px'
}

