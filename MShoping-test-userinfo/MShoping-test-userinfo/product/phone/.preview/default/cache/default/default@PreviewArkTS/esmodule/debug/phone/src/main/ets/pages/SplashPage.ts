if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SplashPage_Params {
    currentBreakpoint?: string;
    breakpointSystem?;
    timeOutId?: number;
}
import router from "@ohos:router";
import { StyleConstants, Logger, BreakpointSystem, BreakPointType } from "@bundle:com.example.multishopping/phone@common/index";
import { PageConstants } from "@bundle:com.example.multishopping/phone/ets/constants/PageConstants";
class SplashPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', 'sm', "currentBreakpoint");
        this.breakpointSystem = new BreakpointSystem();
        this.timeOutId = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SplashPage_Params) {
        if (params.breakpointSystem !== undefined) {
            this.breakpointSystem = params.breakpointSystem;
        }
        if (params.timeOutId !== undefined) {
            this.timeOutId = params.timeOutId;
        }
    }
    updateStateVars(params: SplashPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
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
    private breakpointSystem;
    private timeOutId: number;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
            Flex.debugLine("product/phone/src/main/ets/pages/SplashPage.ets(28:5)", "phone");
            Flex.height(StyleConstants.FULL_HEIGHT);
            Flex.width(StyleConstants.FULL_WIDTH);
            Flex.backgroundColor({ "id": 134217903, "type": 10001, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("product/phone/src/main/ets/pages/SplashPage.ets(29:7)", "phone");
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.flexGrow(StyleConstants.FLEX_GROW);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134217887, "type": 20000, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
            Image.debugLine("product/phone/src/main/ets/pages/SplashPage.ets(30:9)", "phone");
            Image.width(new BreakPointType({
                sm: { "id": 134217732, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" },
                md: { "id": 134217732, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" },
                lg: { "id": 134217733, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
            Image.aspectRatio(PageConstants.IMAGE_ASPECT_RATIO);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134217752, "type": 20000, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
            Image.debugLine("product/phone/src/main/ets/pages/SplashPage.ets(43:7)", "phone");
            Image.width({ "id": 134217736, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
            Image.height({ "id": 134217735, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 134217747, "type": 10003, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
            Text.debugLine("product/phone/src/main/ets/pages/SplashPage.ets(47:7)", "phone");
            Text.fontColor({ "id": 134217902, "type": 10001, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
            Text.fontSize({ "id": 134217917, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" });
            Text.letterSpacing(PageConstants.LETTER_SPACE);
            Text.margin({ top: { "id": 134217940, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" }, bottom: { "id": 134217734, "type": 10002, params: [], "bundleName": "com.example.multishopping", "moduleName": "phone" } });
        }, Text);
        Text.pop();
        Flex.pop();
    }
    aboutToAppear() {
        this.breakpointSystem.register();
        this.timeOutId = setTimeout(() => {
            //router.replaceUrl({ url: PageConstants.MAIN_PAGE_URL })
            router.replaceUrl({ url: 'pages/LoginPage' })
                .catch((err: Error) => {
                Logger.error(JSON.stringify(err));
            });
        }, PageConstants.DELAY_TIME);
    }
    aboutToDisappear() {
        this.breakpointSystem.unregister();
        clearTimeout(this.timeOutId);
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
        this.__currentBreakpoint.resetSource();
    }
    static getEntryName(): string {
        return "SplashPage";
    }
}
registerNamedRoute(() => new SplashPage(undefined, {}), "", { bundleName: "com.example.multishopping", moduleName: "phone", pagePath: "pages/SplashPage", pageFullPath: "product/phone/src/main/ets/pages/SplashPage", integratedHsp: "false", moduleType: "followWithHap" });
