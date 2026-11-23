if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    currentBreakpoint?: string;
    currentPageIndex?: number;
    shoppingCartCache?: Product[];
    shoppingCartList?: Product[];
    params?: UserInfo;
    orderCount?: OrderCount;
    userInfo?: UserInfo;
    breakpointSystem?;
    localDataManager?: LocalDataManager;
}
import router from "@ohos:router";
import { BreakpointSystem, LocalDataManager, Logger, OrderOperationStatus, StyleConstants, BreakpointConstants } from "@bundle:com.example.multishopping/phone@common/index";
import type { Product, Commodity } from "@bundle:com.example.multishopping/phone@common/index";
import { Home } from "@bundle:com.example.multishopping/phone@home/index";
import { NewProduct } from "@bundle:com.example.multishopping/phone@newproduct/index";
import { ShopCart } from "@bundle:com.example.multishopping/phone@shopcart/index";
import { Personal } from "@bundle:com.example.multishopping/phone@personal/index";
import { buttonInfo } from "@bundle:com.example.multishopping/phone/ets/viewmodel/MainPageData";
import type { ButtonInfoModel } from "@bundle:com.example.multishopping/phone/ets/viewmodel/MainPageData";
import { PageConstants } from "@bundle:com.example.multishopping/phone/ets/constants/PageConstants";
import type { OrderCount } from '@ohos/commoditydetail/src/main/ets/viewmodel/TypeModel';
import type { UserInfo } from '../model/UserModel';
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', 'sm', "currentBreakpoint");
        this.__currentPageIndex = this.createStorageLink('IndexPage', 0, "currentPageIndex");
        this.__shoppingCartCache = new ObservedPropertyObjectPU([], this, "shoppingCartCache");
        this.__shoppingCartList = new ObservedPropertyObjectPU([], this, "shoppingCartList");
        this.__params = new ObservedPropertyObjectPU({} as UserInfo, this, "params");
        this.__orderCount = new ObservedPropertyObjectPU({
            payment: 0,
            ship: 0,
            receipt: 0,
            evaluation: 0,
            sale: 0
        }, this, "orderCount");
        this.__userInfo = new ObservedPropertyObjectPU({
            userId: -1,
            userName: 'Mtest',
            userGender: '',
            userEmail: 'Mtest@Mtest.com'
        }, this, "userInfo");
        this.addProvidedVar("userInfo", this.__userInfo, false);
        this.breakpointSystem = new BreakpointSystem();
        this.localDataManager = LocalDataManager.instance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.shoppingCartCache !== undefined) {
            this.shoppingCartCache = params.shoppingCartCache;
        }
        if (params.shoppingCartList !== undefined) {
            this.shoppingCartList = params.shoppingCartList;
        }
        if (params.params !== undefined) {
            this.params = params.params;
        }
        if (params.orderCount !== undefined) {
            this.orderCount = params.orderCount;
        }
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
        if (params.breakpointSystem !== undefined) {
            this.breakpointSystem = params.breakpointSystem;
        }
        if (params.localDataManager !== undefined) {
            this.localDataManager = params.localDataManager;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPageIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__shoppingCartCache.purgeDependencyOnElmtId(rmElmtId);
        this.__shoppingCartList.purgeDependencyOnElmtId(rmElmtId);
        this.__params.purgeDependencyOnElmtId(rmElmtId);
        this.__orderCount.purgeDependencyOnElmtId(rmElmtId);
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentPageIndex.aboutToBeDeleted();
        this.__shoppingCartCache.aboutToBeDeleted();
        this.__shoppingCartList.aboutToBeDeleted();
        this.__params.aboutToBeDeleted();
        this.__orderCount.aboutToBeDeleted();
        this.__userInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentPageIndex: ObservedPropertyAbstractPU<number>;
    get currentPageIndex() {
        return this.__currentPageIndex.get();
    }
    set currentPageIndex(newValue: number) {
        this.__currentPageIndex.set(newValue);
    }
    private __shoppingCartCache: ObservedPropertyObjectPU<Product[]>;
    get shoppingCartCache() {
        return this.__shoppingCartCache.get();
    }
    set shoppingCartCache(newValue: Product[]) {
        this.__shoppingCartCache.set(newValue);
    }
    private __shoppingCartList: ObservedPropertyObjectPU<Product[]>;
    get shoppingCartList() {
        return this.__shoppingCartList.get();
    }
    set shoppingCartList(newValue: Product[]) {
        this.__shoppingCartList.set(newValue);
    }
    private __params: ObservedPropertyObjectPU<UserInfo>;
    get params() {
        return this.__params.get();
    }
    set params(newValue: UserInfo) {
        this.__params.set(newValue);
    }
    //private router: Router;
    private __orderCount: ObservedPropertyObjectPU<OrderCount>;
    get orderCount() {
        return this.__orderCount.get();
    }
    set orderCount(newValue: OrderCount) {
        this.__orderCount.set(newValue);
    }
    private __userInfo: ObservedPropertyObjectPU<UserInfo>;
    get userInfo() {
        return this.__userInfo.get();
    }
    set userInfo(newValue: UserInfo) {
        this.__userInfo.set(newValue);
    }
    private breakpointSystem;
    private localDataManager: LocalDataManager;
    aboutToAppear() {
        this.breakpointSystem.register();
        this.shoppingCartList = this.shoppingCartCache?.length > 0 ? this.shoppingCartCache : [];
        this.queryOrderList();
    }
    aboutToDisappear() {
        this.breakpointSystem.unregister();
    }
    queryShopCart() {
        const shoppingData = this.localDataManager.queryShopCart();
        this.shoppingCartList = shoppingData;
        this.shoppingCartCache = shoppingData;
    }
    routerDetailPage(data: Commodity) {
        router.pushUrl({
            url: PageConstants.COMMODITY_DETAIL_PAGE_URL,
            params: { id: data.id }
        }).catch((err: Error) => {
            Logger.error(JSON.stringify(err));
        });
    }
    queryOrderList() {
        const orderList = this.localDataManager.queryOrderList();
        this.orderCount = {
            payment: orderList.filter(item => item.status === OrderOperationStatus.UN_PAY).length,
            ship: 0,
            receipt: orderList.filter(item => item.status === OrderOperationStatus.DELIVERED).length,
            evaluation: orderList.filter(item => item.status === OrderOperationStatus.RECEIPT).length,
            sale: 0,
        };
        if (this.params != undefined) {
            this.userInfo = {
                userId: this.params.userId,
                userName: this.params.userName,
                userGender: '',
                userEmail: this.params.userEmail
            };
        }
        else {
            this.userInfo = {
                userId: -1,
                userName: 'Mtest',
                userGender: '',
                userEmail: 'Mtest@Mtest.com'
            };
        }
    }
    onPageShow() {
        this.queryShopCart();
        this.queryOrderList();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("product/phone/src/main/ets/pages/MainPage.ets(119:5)", "phone");
            Column.backgroundColor({ "id": 134217903, "type": 10001, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({
                barPosition: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? BarPosition.Start : BarPosition.End,
                index: this.currentPageIndex
            });
            Tabs.debugLine("product/phone/src/main/ets/pages/MainPage.ets(120:7)", "phone");
            Tabs.barWidth(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 134217730, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" } : StyleConstants.FULL_WIDTH);
            Tabs.barHeight(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ?
                StyleConstants.SIXTY_HEIGHT : { "id": 134217933, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
            Tabs.vertical(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG);
            Tabs.scrollable(false);
            Tabs.onChange((index: number) => {
                this.currentPageIndex = index;
                if (index === PageConstants.PERSONAL_INDEX) {
                    this.queryShopCart();
                }
                else if (index === PageConstants.PERSONAL_INDEX) {
                    this.queryOrderList();
                }
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new Home(this, {
                                onClickItem: (data: Commodity): void => this.routerDetailPage(data)
                            }, undefined, elmtId, () => { }, { page: "product/phone/src/main/ets/pages/MainPage.ets", line: 125, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    onClickItem: (data: Commodity): void => this.routerDetailPage(data)
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "Home" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.BottomNavigation.call(this, buttonInfo[PageConstants.HOME_INDEX]);
                } });
            TabContent.debugLine("product/phone/src/main/ets/pages/MainPage.ets(124:9)", "phone");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new NewProduct(this, {}, undefined, elmtId, () => { }, { page: "product/phone/src/main/ets/pages/MainPage.ets", line: 132, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "NewProduct" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.BottomNavigation.call(this, buttonInfo[PageConstants.NEW_PRODUCT_INDEX]);
                } });
            TabContent.debugLine("product/phone/src/main/ets/pages/MainPage.ets(131:9)", "phone");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ShopCart(this, {
                                products: this.__shoppingCartList,
                                onNeedUpdate: (): void => this.queryShopCart()
                            }, undefined, elmtId, () => { }, { page: "product/phone/src/main/ets/pages/MainPage.ets", line: 137, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    products: this.__shoppingCartList,
                                    onNeedUpdate: (): void => this.queryShopCart()
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "ShopCart" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.BottomNavigation.call(this, buttonInfo[PageConstants.SHOP_CART_INDEX]);
                } });
            TabContent.debugLine("product/phone/src/main/ets/pages/MainPage.ets(136:9)", "phone");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new Personal(this, { orderCount: this.__orderCount }, undefined, elmtId, () => { }, { page: "product/phone/src/main/ets/pages/MainPage.ets", line: 145, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    orderCount: this.__orderCount
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "Personal" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.BottomNavigation.call(this, buttonInfo[PageConstants.PERSONAL_INDEX]);
                } });
            TabContent.debugLine("product/phone/src/main/ets/pages/MainPage.ets(144:9)", "phone");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
    BottomNavigation(button: ButtonInfoModel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: PageConstants.BUTTON_SPACE });
            Column.debugLine("product/phone/src/main/ets/pages/MainPage.ets(168:5)", "phone");
            Column.width(StyleConstants.FULL_WIDTH);
            Column.height(StyleConstants.FULL_HEIGHT);
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.currentPageIndex === button.index ? button.selectImg : button.img);
            Image.debugLine("product/phone/src/main/ets/pages/MainPage.ets(169:7)", "phone");
            Image.objectFit(ImageFit.Contain);
            Image.width({ "id": 134217731, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
            Image.height({ "id": 134217731, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(button.title);
            Text.debugLine("product/phone/src/main/ets/pages/MainPage.ets(173:7)", "phone");
            Text.fontColor(this.currentPageIndex === button.index ? { "id": 134217901, "type": 10001, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" } : Color.Black);
            Text.opacity(this.currentPageIndex === button.index ? StyleConstants.FULL_OPACITY : StyleConstants.SIXTY_OPACITY);
            Text.fontWeight(StyleConstants.FONT_WEIGHT_FIVE);
            Text.textAlign(TextAlign.Center);
            Text.fontSize({ "id": 134217927, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
        this.__currentBreakpoint.resetSource();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "com.example.multishopping", moduleName: "phone", pagePath: "pages/MainPage", pageFullPath: "product/phone/src/main/ets/pages/MainPage", integratedHsp: "false", moduleType: "followWithHap" });
