if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RegisterView_Params {
    name?: string;
    email?: string;
    password?: string;
}
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
import { UserModel } from "@bundle:com.example.multishopping/phone/ets/model/UserModel";
import UserViewModel from "@bundle:com.example.multishopping/phone/ets/viewmodel/UserViewModel";
export class RegisterView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__name = new ObservedPropertySimplePU('', this, "name");
        this.__email = new ObservedPropertySimplePU('', this, "email");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RegisterView_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
    }
    updateStateVars(params: RegisterView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__name.purgeDependencyOnElmtId(rmElmtId);
        this.__email.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__email.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __name: ObservedPropertySimplePU<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
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
    register(user: UserModel) {
        let data = UserViewModel.registerUser(user);
        if (data) {
            promptAction.showToast({ message: "注册成功" + user.email });
            router.pushUrl({
                url: 'pages/LoginPage'
            });
        }
        else {
            promptAction.showToast({ message: "注册失败" });
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("product/phone/src/main/ets/view/RegisterView.ets(24:5)", "phone");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor($r('app.color.bg_color'));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create($r('app.media.banner'));
            Image.debugLine("product/phone/src/main/ets/view/RegisterView.ets(25:7)", "phone");
            Image.width('100%');
            Image.height('15%');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/RegisterView.ets(26:7)", "phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("product/phone/src/main/ets/view/RegisterView.ets(27:7)", "phone");
            Column.backgroundColor(Color.White);
            Column.width('95%');
            Column.height('50%');
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
            Text.create($r('app.string.title_register_label'));
            Text.debugLine("product/phone/src/main/ets/view/RegisterView.ets(28:9)", "phone");
            Text.fontSize($r('app.float.font26'));
            Text.fontColor($r('app.color.text_color'));
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: $r('app.string.name_register_label') });
            TextInput.debugLine("product/phone/src/main/ets/view/RegisterView.ets(31:9)", "phone");
            TextInput.height($r('app.float.float50'));
            TextInput.width('100%');
            TextInput.margin({ bottom: $r('app.float.float10') });
            TextInput.type(InputType.Email);
            TextInput.caretColor($r('app.color.text_color'));
            TextInput.placeholderColor($r('app.color.text_placeholder_color'));
            TextInput.onChange((value) => {
                this.name = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: $r('app.string.email_placeholder_label') });
            TextInput.debugLine("product/phone/src/main/ets/view/RegisterView.ets(41:9)", "phone");
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
            TextInput.debugLine("product/phone/src/main/ets/view/RegisterView.ets(51:9)", "phone");
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
            Button.debugLine("product/phone/src/main/ets/view/RegisterView.ets(62:9)", "phone");
            Button.width('100%');
            Button.height($r('app.float.float58'));
            Button.backgroundColor($r('app.color.btn_bg_color'));
            Button.margin({ top: $r('app.float.float28') });
            Button.onClick(() => {
                if (this.name === '') {
                    promptAction.showToast({ message: $r('app.string.name_err_label') });
                    return;
                }
                if (this.email === '') {
                    promptAction.showToast({ message: $r('app.string.email_err_label') });
                    return;
                }
                if (this.password === '') {
                    promptAction.showToast({ message: $r('app.string.password_err_label') });
                    return;
                }
                let user = new UserModel(0, this.name, this.email, this.password);
                this.register(user);
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create($r('app.string.register_label'));
            Text.debugLine("product/phone/src/main/ets/view/RegisterView.ets(64:11)", "phone");
            Text.fontColor(Color.White);
            Text.fontSize($r('app.float.font18'));
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/RegisterView.ets(87:9)", "phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("product/phone/src/main/ets/view/RegisterView.ets(88:9)", "phone");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create($r('app.string.subtitle_register_label'));
            Text.debugLine("product/phone/src/main/ets/view/RegisterView.ets(90:11)", "phone");
            Text.fontColor($r('app.color.text_color'));
            Text.onClick(() => {
                router.pushUrl({
                    url: 'pages/LoginPage'
                });
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/RegisterView.ets(98:11)", "phone");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create($r('app.string.forget_pwd_label'));
            Text.debugLine("product/phone/src/main/ets/view/RegisterView.ets(100:11)", "phone");
            Text.fontColor($r('app.color.text_color'));
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/RegisterView.ets(102:9)", "phone");
        }, Blank);
        Blank.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("product/phone/src/main/ets/view/RegisterView.ets(115:7)", "phone");
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
