if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginView_Params {
    email?: string;
    password?: string;
}
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
import UserViewModel from "@bundle:com.example.multishopping/phone/ets/viewmodel/UserViewModel";
export class LoginView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__email = new ObservedPropertySimplePU('', this, "email");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginView_Params) {
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
    }
    updateStateVars(params: LoginView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__email.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__email.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __email: ObservedPropertySimplePU<string>;
    get email() {
        return this.__email.get();
    }
    set email(newValue: string) {
        this.__email.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    login(email: string, password: string) {
        let data = UserViewModel.userLogin(email, password);
        if (data) {
            promptAction.showToast({ message: "登录成功" + data.userEmail });
            router.pushUrl({
                //url:PageConstants.MAIN_PAGE_URL,
                url: 'pages/Index',
                params: { userId: data.userId, userName: data.userName, userEmail: data.userEmail }
            });
        }
        else {
            promptAction.showToast({ message: "登录失败" });
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("product/phone/src/main/ets/view/LoginView.ets(27:5)", "phone");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor($r('app.color.bg_color'));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create($r('app.media.banner'));
            Image.debugLine("product/phone/src/main/ets/view/LoginView.ets(28:7)", "phone");
            Image.width('100%');
            Image.height('15%');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(29:7)", "phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("product/phone/src/main/ets/view/LoginView.ets(30:7)", "phone");
            Column.backgroundColor(Color.White);
            Column.width('95%');
            Column.height('45%');
            Column.padding({ left: $r('app.float.float10'), right: $r('app.float.float10') });
            Column.borderRadius($r('app.float.font18'));
            Column.shadow({
                radius: $r('app.float.float10'),
                color: $r('app.color.shadow_color'),
                offsetX: $r('app.float.float4'),
                offsetY: $r('app.float.float8')
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create($r('app.string.title_login_label'));
            Text.debugLine("product/phone/src/main/ets/view/LoginView.ets(31:9)", "phone");
            Text.fontSize($r('app.float.font26'));
            Text.fontColor($r('app.color.text_color'));
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: $r('app.string.email_placeholder_label') });
            TextInput.debugLine("product/phone/src/main/ets/view/LoginView.ets(34:9)", "phone");
            TextInput.height($r('app.float.float50'));
            TextInput.width('100%');
            TextInput.type(InputType.Email);
            TextInput.caretColor($r('app.color.text_color'));
            TextInput.placeholderColor($r('app.color.text_placeholder_color'));
            TextInput.onChange((value) => {
                this.email = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
            TextInput.create({ placeholder: $r('app.string.pwd_placeholder_label') });
            TextInput.debugLine("product/phone/src/main/ets/view/LoginView.ets(44:9)", "phone");
            //TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
            TextInput.height($r('app.float.float50'));
            //TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
            TextInput.width('100%');
            //TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
            TextInput.showPasswordIcon(true);
            //TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
            TextInput.margin({ top: $r('app.float.float12') });
            //TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
            TextInput.type(InputType.Password);
            //TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
            TextInput.caretColor($r('app.color.text_color'));
            //TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
            TextInput.placeholderColor($r('app.color.text_placeholder_color'));
            //TextInput({placeholder: $r('app.string.pwd_placeholder_label')})
            TextInput.onChange((value) => {
                this.password = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("product/phone/src/main/ets/view/LoginView.ets(55:9)", "phone");
            Button.width('100%');
            Button.height($r('app.float.float58'));
            Button.backgroundColor($r('app.color.btn_bg_color'));
            Button.margin({ top: $r('app.float.float28') });
            Button.onClick(() => {
                if (this.email === '') {
                    promptAction.showToast({ message: $r('app.string.email_err_label') });
                    return;
                }
                if (this.password === '') {
                    promptAction.showToast({ message: $r('app.string.password_err_label') });
                    return;
                }
                this.login(this.email, this.password);
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create($r('app.string.login_label'));
            Text.debugLine("product/phone/src/main/ets/view/LoginView.ets(57:11)", "phone");
            Text.fontColor(Color.White);
            Text.fontSize($r('app.float.font18'));
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(74:9)", "phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("product/phone/src/main/ets/view/LoginView.ets(75:9)", "phone");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create($r('app.string.subtitle_login_label'));
            Text.debugLine("product/phone/src/main/ets/view/LoginView.ets(77:11)", "phone");
            Text.fontColor($r('app.color.text_color'));
            Text.onClick(() => {
                router.pushUrl({
                    url: 'pages/RegisterPage'
                });
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(86:11)", "phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create($r('app.string.forget_pwd_label'));
            Text.debugLine("product/phone/src/main/ets/view/LoginView.ets(88:11)", "phone");
            Text.fontColor($r('app.color.text_color'));
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(90:9)", "phone");
        }, Blank);
        Blank.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(103:7)", "phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("product/phone/src/main/ets/view/LoginView.ets(104:7)", "phone");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(105:9)", "phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("product/phone/src/main/ets/view/LoginView.ets(107:9)", "phone");
            Divider.width($r('app.float.float100'));
            Divider.color($r('app.color.shadow_color'));
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create($r('app.string.other_label'));
            Text.debugLine("product/phone/src/main/ets/view/LoginView.ets(108:9)", "phone");
            Text.margin({ left: $r('app.float.float18'), right: $r('app.float.float18') });
            Text.fontColor($r('app.color.text_color'));
            Text.fontSize($r('app.float.font16'));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("product/phone/src/main/ets/view/LoginView.ets(113:9)", "phone");
            Divider.width($r('app.float.float100'));
            Divider.color($r('app.color.shadow_color'));
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(114:9)", "phone");
        }, Blank);
        Blank.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("product/phone/src/main/ets/view/LoginView.ets(116:7)", "phone");
            Row.width('108%');
            Row.margin({ top: $r('app.float.float10') });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(117:9)", "phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create($r('app.media.share_icon_sinaweibo'));
            Image.debugLine("product/phone/src/main/ets/view/LoginView.ets(119:9)", "phone");
            Image.width(45);
            Image.height(45);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(121:9)", "phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create($r('app.media.share_icon_wechat'));
            Image.debugLine("product/phone/src/main/ets/view/LoginView.ets(123:9)", "phone");
            Image.width(45);
            Image.height(45);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(125:9)", "phone");
        }, Blank);
        Blank.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/LoginView.ets(127:7)", "phone");
        }, Blank);
        Blank.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
    }
}
