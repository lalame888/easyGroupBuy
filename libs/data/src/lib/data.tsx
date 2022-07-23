

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
  default?: boolean
}

export class PageMap  extends Cloneable {
  public childPage: ChildPage;

  constructor(
    public pageState:PageState
  ) {
    super();
    this.childPage = this.getDefaultChild(this.getChildPageMenu(pageState))
  }

  public getChildPageMenu(pageState: PageState = this.pageState): ChildPage[] {
    switch(pageState) {
      case PageState['開團']:
        return [
          {pageName: '開新團'},
          {pageName: '跟新團'},
          {pageName: '目前團單',default: true},
          {pageName: '歷史團單'},
          {pageName: '儲存商家'}
        ];
      case PageState['使用說明']:
        return [
          {pageName: '使用說明'}
        ]
      case PageState['聯絡我們']:
      return [
        {pageName: '聯絡我們'}
      ]
      case PageState['關於輕鬆開好團']:
      return [
        {pageName: '關於輕鬆開好團'}
      ]
    }
  }

  getDefaultChild(array: ChildPage[]): ChildPage  {
    if (array.length === 0 ) throw new Error(`getDefaultChild 陣列為空`);
    return array.find((child)=> child.default) || array[0]
  }

  
}

export const THEME = {
  broder: '1px solid #489A81',
  buttonBorderRadius: '30px'
}

