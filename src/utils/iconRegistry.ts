// utils/iconRegistry.ts
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import type { App } from 'vue';

/**
 * 图标分类配置 - 严格对应 Element Plus 官网分类
 * @see https://element-plus.org/zh-CN/component/icon.html
 */
export const IconCategories = {
  // 系统/基础操作图标
  system: [
    'Plus',
    'Minus',
    'CirclePlus',
    'Search',
    'Female',
    'Male',
    'Aim',
    'House',
    'FullScreen',
    'Loading',
    'Link',
    'Service',
    'Pointer',
    'Star',
    'Notification',
    'Connection',
    'ChatDotRound',
    'Setting',
    'Clock',
    'Position',
    'Discount',
    'Odometer',
    'ChatSquare',
    'ChatRound',
    'ChatLineRound',
    'ChatLineSquare',
    'ChatDotSquare',
    'View',
    'Hide',
    'Unlock',
    'Lock',
    'RefreshRight',
    'RefreshLeft',
    'Refresh',
    'Bell',
    'MuteNotification',
    'User',
    'Check',
    'CircleCheck',
    'Warning',
    'CircleClose',
    'Close',
    'PieChart',
    'More',
    'Compass',
    'Filter',
    'Switch',
    'Select',
    'SemiSelect',
    'CloseBold',
    'EditPen',
    'Edit',
    'Message',
    'MessageBox',
    'TurnOff',
    'Finished',
    'Delete',
    'Crop',
    'SwitchButton',
    'Operation',
    'Open',
    'Remove',
    'ZoomOut',
    'ZoomIn',
    'InfoFilled',
    'CircleCheckFilled',
    'SuccessFilled',
    'WarningFilled',
    'CircleCloseFilled',
    'QuestionFilled',
    'WarnTriangleFilled',
    'UserFilled',
    'MoreFilled',
    'Tools',
    'HomeFilled',
    'Menu',
    'UploadFilled',
    'Avatar',
    'HelpFilled',
    'Share',
    'StarFilled',
    'Comment',
    'Histogram',
    'Grid',
    'Promotion',
    'DeleteFilled',
    'RemoveFilled',
    'CirclePlusFilled'
  ],

  // 箭头/导航图标
  arrow: [
    'ArrowLeft',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeftBold',
    'ArrowUpBold',
    'ArrowRightBold',
    'ArrowDownBold',
    'DArrowRight',
    'DArrowLeft',
    'Download',
    'Upload',
    'Top',
    'Bottom',
    'Back',
    'Right',
    'TopRight',
    'TopLeft',
    'BottomRight',
    'BottomLeft',
    'Sort',
    'SortUp',
    'SortDown',
    'Rank',
    'CaretLeft',
    'CaretTop',
    'CaretRight',
    'CaretBottom',
    'DCaret',
    'Expand',
    'Fold'
  ],

  // 文档/办公图标
  document: [
    'DocumentAdd',
    'Document',
    'Notebook',
    'Tickets',
    'Memo',
    'Collection',
    'Postcard',
    'ScaleToOriginal',
    'SetUp',
    'DocumentDelete',
    'DocumentChecked',
    'DataBoard',
    'DataAnalysis',
    'CopyDocument',
    'FolderChecked',
    'Files',
    'Folder',
    'FolderDelete',
    'FolderRemove',
    'FolderOpened',
    'DocumentCopy',
    'DocumentRemove',
    'FolderAdd',
    'FirstAidKit',
    'Reading',
    'DataLine',
    'Management',
    'Checked',
    'Ticket',
    'Failed',
    'TrendCharts',
    'List'
  ],

  // 媒体图标
  media: [
    'Microphone',
    'Mute',
    'Mic',
    'VideoPause',
    'VideoCamera',
    'VideoPlay',
    'Headset',
    'Monitor',
    'Film',
    'Camera',
    'Picture',
    'PictureRounded',
    'Iphone',
    'Cellphone',
    'VideoCameraFilled',
    'PictureFilled',
    'Platform',
    'CameraFilled',
    'BellFilled'
  ],

  // 交通/位置图标
  traffic: [
    'Location',
    'LocationInformation',
    'DeleteLocation',
    'Coordinate',
    'Bicycle',
    'OfficeBuilding',
    'School',
    'Guide',
    'AddLocation',
    'MapLocation',
    'Place',
    'LocationFilled',
    'Van'
  ],

  // 餐饮图标
  food: [
    'Watermelon',
    'Pear',
    'NoSmoking',
    'Smoking',
    'Mug',
    'GobletSquareFull',
    'GobletFull',
    'KnifeFork',
    'Sugar',
    'Bowl',
    'MilkTea',
    'Lollipop',
    'Coffee',
    'Chicken',
    'Dish',
    'IceTea',
    'ColdDrink',
    'CoffeeCup',
    'DishDot',
    'IceDrink',
    'IceCream',
    'Dessert',
    'IceCreamSquare',
    'ForkSpoon',
    'IceCreamRound',
    'Food',
    'HotWater',
    'Grape',
    'Fries',
    'Apple',
    'Burger',
    'Goblet',
    'GobletSquare',
    'Orange',
    'Cherry'
  ],

  // 物品图标
  items: [
    'Printer',
    'Calendar',
    'CreditCard',
    'Box',
    'Money',
    'Refrigerator',
    'Cpu',
    'Football',
    'Brush',
    'Suitcase',
    'SuitcaseLine',
    'Umbrella',
    'AlarmClock',
    'Medal',
    'GoldMedal',
    'Present',
    'Mouse',
    'Watch',
    'QuartzWatch',
    'Magnet',
    'Help',
    'Soccer',
    'ToiletPaper',
    'ReadingLamp',
    'Paperclip',
    'MagicStick',
    'Basketball',
    'Baseball',
    'Coin',
    'Goods',
    'Sell',
    'SoldOut',
    'Key',
    'ShoppingCart',
    'ShoppingCartFull',
    'ShoppingTrolley',
    'Phone',
    'Scissor',
    'Handbag',
    'ShoppingBag',
    'Trophy',
    'TrophyBase',
    'Stopwatch',
    'Timer',
    'CollectionTag',
    'TakeawayBox',
    'PriceTag',
    'Wallet',
    'Opportunity',
    'PhoneFilled',
    'WalletFilled',
    'GoodsFilled',
    'Flag',
    'BrushFilled',
    'Briefcase',
    'Stamp'
  ],

  // 天气图标
  weather: [
    'Sunrise',
    'Sunny',
    'Ship',
    'MostlyCloudy',
    'PartlyCloudy',
    'Sunset',
    'Drizzling',
    'Pouring',
    'Cloudy',
    'Moon',
    'MoonNight',
    'Lightning'
  ],

  // 其他/品牌图标
  other: [
    'ChromeFilled',
    'Eleme',
    'ElemeFilled',
    'ElementPlus',
    'Shop',
    'SwitchFilled',
    'WindPower'
  ]
} as const;

export type IconCategory = keyof typeof IconCategories;

/**
 * 按分类注册图标
 * @param app Vue 应用实例
 * @param categories 要注册的分类，不传则注册所有
 */
export function registerIconsByCategory(app: App, categories?: IconCategory[]) {
  const categoriesToRegister =
    categories || (Object.keys(IconCategories) as IconCategory[]);

  const registeredIcons: string[] = [];

  categoriesToRegister.forEach((category) => {
    const icons = IconCategories[category];
    icons.forEach((iconName) => {
      const component =
        ElementPlusIconsVue[iconName as keyof typeof ElementPlusIconsVue];
      if (component) {
        app.component(iconName, component);
        registeredIcons.push(iconName);
      } else {
        console.warn(`[IconRegistry] 图标 "${iconName}" 不存在`);
      }
    });
  });

  console.log(
    `[IconRegistry] 已注册 ${registeredIcons.length} 个图标，分类: ${categoriesToRegister.join(', ')}`
  );
}

/**
 * 获取指定分类的图标列表
 */
export function getIconsByCategory(category: IconCategory): string[] {
  return [...IconCategories[category]];
}

/**
 * 获取所有分类信息
 */
export function getAllCategories() {
  return Object.entries(IconCategories).map(([name, icons]) => ({
    name: name as IconCategory,
    count: icons.length,
    icons: [...icons]
  }));
}
