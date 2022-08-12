"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[472],{4472:(ar,v,n)=>{n.r(v),n.d(v,{AuthModule:()=>nr});var h=n(2864),c=n(8692),I=n(2355),U=n(7969),r=n(4537),Z=n(4325);let F=(()=>{class o{constructor(t,i){this.userService=t,this.router=i}canActivate(){return this.userService.isAuthorized$.pipe((0,U.U)(t=>!t||this.router.parseUrl("/")))}}return o.\u0275fac=function(t){return new(t||o)(r.LFG(Z.K),r.LFG(h.F0))},o.\u0275prov=r.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var f,o,S=n(3101),x=n(4762),a=n(92),A=n(447),P=n(8023),C=n(3787),J=n(3568),u=(()=>{return(o=u||(u={})).Email="email",o.Required="required",o.Match="match",o.MinLength="minlength",o.MaxLength="maxlength",o.Min="min",o.Max="max",o.Pattern="pattern",o.AppError="appError",o.Greater="greater",u;var o})();function E(o){return e=>e.pipe((0,J.K)(t=>{if(t instanceof A.k){const{validationData:i}=t;return o instanceof P.x?o.next(i):y(o,i),(0,C._)(()=>new A.g("Invalid form data."))}return(0,C._)(()=>t)}))}function y(o,e){Object.keys(o.controls).forEach(i=>{const s=e[i],m=o.controls[i];s&&m&&("string"==typeof s?m.setErrors(f.buildAppError(s)):m instanceof a.nJ&&"object"==typeof s&&y(m,s))})}(o=f||(f={})).matchControl=function e(i,s=i){return m=>m.parent&&m.parent.get(i)?.value!==m.value?{[u.Match]:{controlName:i,controlTitle:s}}:null},o.buildAppError=function t(i){return{[u.AppError]:{message:i}}};var d=n(8609),R=n(3072),M=n(9018),Q=n(1860),Y=n(6466),O=n(2085),j=n(8499),q=n(408),G=n(5490);function T(o){const e=(0,R.P)(()=>(o.next(!0),M.E));return t=>{const i=t.pipe((0,Y.d)({refCount:!0,bufferSize:1})),s=i.pipe(function z(){return(0,O.e)((o,e)=>{o.subscribe(new j.Q(e,q.Z))})}(),(0,G.x)(()=>o.next(!1)));return(0,Q.T)(e,s,i)}}var L=n(4121),l=n(8659),w=n(9638),$=n(3331),b=n(827),N=n(9665);function K(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.loginForm.getError("login")," ")}}function X(o,e){1&o&&r._UZ(0,"mat-progress-bar",10)}function B(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.loginForm.controls.email.getError("appError")," ")}}function D(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.loginForm.controls.password.getError("appError")," ")}}let p=class{constructor(e,t){this.formBuilder=e,this.userService=t,this.isLoading$=new L.X(!1),this.shouldShowPassword=!0,this.loginForm=this.formBuilder.nonNullable.group({email:["",[a.kI.required,a.kI.email]],password:["",[a.kI.required]]})}onLogin(){this.loginForm.invalid||this.userService.login({email:this.loginForm.value.email??"",password:this.loginForm.value.password??""}).pipe(T(this.isLoading$),E(this.loginForm),(0,d.t)(this)).subscribe({error:()=>{this.loginForm.setErrors({login:"Wrong email or password"})}})}};p.\u0275fac=function(e){return new(e||p)(r.Y36(a.qu),r.Y36(Z.K))},p.\u0275cmp=r.Xpm({type:p,selectors:[["camp-login-form"]],decls:23,vars:14,consts:[[1,"form",3,"formGroup","ngSubmit"],[4,"ngIf"],["mode","indeterminate",4,"ngIf"],["appearance","fill",1,"form__field"],["matInput","","placeholder","pat@example.com","formControlName","email","autocomplete","email","required",""],["matInput","","autocomplete","current-password","formControlName","password",3,"type"],["type","button","matSuffix","",3,"click"],["appearance","fill"],["mat-button","","type","submit","color","primary",3,"disabled"],["routerLink","registration"],["mode","indeterminate"]],template:function(e,t){1&e&&(r.TgZ(0,"form",0),r.NdJ("ngSubmit",function(){return t.onLogin()}),r.YNc(1,K,2,1,"mat-error",1),r.YNc(2,X,1,0,"mat-progress-bar",2),r.ALo(3,"async"),r.TgZ(4,"mat-form-field",3)(5,"mat-label"),r._uU(6,"Email"),r.qZA(),r._UZ(7,"input",4),r.YNc(8,B,2,1,"mat-error",1),r.qZA(),r.TgZ(9,"mat-form-field",3)(10,"mat-label"),r._uU(11,"Enter your password"),r.qZA(),r._UZ(12,"input",5),r.TgZ(13,"button",6),r.NdJ("click",function(){return t.shouldShowPassword=!t.shouldShowPassword}),r.TgZ(14,"mat-icon",7),r._uU(15),r.qZA()(),r.YNc(16,D,2,1,"mat-error",1),r.qZA(),r.TgZ(17,"div")(18,"button",8),r.ALo(19,"async"),r._uU(20," Log-in "),r.qZA(),r.TgZ(21,"a",9),r._uU(22," Register "),r.qZA()()()),2&e&&(r.Q6J("formGroup",t.loginForm),r.xp6(1),r.Q6J("ngIf",t.loginForm.hasError("login")),r.xp6(1),r.Q6J("ngIf",r.lcZ(3,10,t.isLoading$)),r.xp6(6),r.Q6J("ngIf",t.loginForm.controls.email.hasError("appError")),r.xp6(4),r.Q6J("type",t.shouldShowPassword?"password":"text"),r.xp6(1),r.uIk("aria-label","Hide password")("aria-pressed",t.shouldShowPassword),r.xp6(2),r.hij(" ",t.shouldShowPassword?"visibility_off":"visibility"," "),r.xp6(1),r.Q6J("ngIf",t.loginForm.controls.password.hasError("appError")),r.xp6(2),r.Q6J("disabled",r.lcZ(19,12,t.isLoading$)))},dependencies:[c.O5,a._Y,a.Fj,a.JJ,a.JL,a.Q7,a.sg,a.u,h.yS,l.TO,l.KE,l.hX,l.R9,w.lW,$.Hw,b.pW,N.Nt,c.Ov],styles:["[_nghost-%COMP%]{display:block;padding:20px}.form__field[_ngcontent-%COMP%]{width:100%}"],changeDetection:0}),p=(0,x.gn)([(0,d.V)()],p);let W=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["camp-login-page"]],decls:1,vars:0,consts:[[1,"login-form"]],template:function(t,i){1&t&&r._UZ(0,"camp-login-form",0)},dependencies:[p],styles:[".login-form[_ngcontent-%COMP%]{max-width:400px;margin:0 auto}[_nghost-%COMP%]{display:block;height:100%}"],changeDetection:0}),o})();function H(o,e){1&o&&r._UZ(0,"mat-progress-bar",10)}function V(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," Must be an email address "),r.qZA())}function k(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.registrationForm.controls.email.getError("appError").message," ")}}function _(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.registrationForm.controls.firstName.getError("appError").message," ")}}function rr(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.registrationForm.controls.lastName.getError("appError").message," ")}}function or(o,e){if(1&o&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&o){const t=r.oxw();r.xp6(1),r.hij(" ",t.registrationForm.controls.password.getError("appError").message," ")}}function tr(o,e){1&o&&(r.TgZ(0,"mat-error"),r._uU(1," Passwords not matched "),r.qZA())}let g=class{constructor(e,t){this.formBuilder=e,this.userService=t,this.isLoading$=new L.X(!1),this.registrationForm=this.formBuilder.group({email:["",[a.kI.email,a.kI.required]],firstName:["",[a.kI.required]],lastName:["",[a.kI.required]],password:["",[a.kI.required]],passwordConfirm:["",[a.kI.required,f.matchControl("password")]]})}onRegistrationSubmit(){if(this.registrationForm.invalid)return;const{email:e,firstName:t,lastName:i,password:s}=this.registrationForm.value;this.userService.register({email:e??"",firstName:t??"",lastName:i??"",password:s??""}).pipe(T(this.isLoading$),E(this.registrationForm),(0,d.t)(this)).subscribe()}};g.\u0275fac=function(e){return new(e||g)(r.Y36(a.qu),r.Y36(Z.K))},g.\u0275cmp=r.Xpm({type:g,selectors:[["camp-registration-form"]],decls:32,vars:13,consts:[[1,"form",3,"formGroup","onSubmit"],["mode","indeterminate",4,"ngIf"],["appearance","fill",1,"form__field"],["matInput","","placeholder","pat@example.com","formControlName","email","autocomplete","email"],[4,"ngIf"],["matInput","","placeholder","Naruto","formControlName","firstName","autocomplete","additional-name"],["matInput","","placeholder","Uzumaki","formControlName","lastName","autocomplete","family-name"],["matInput","","type","password","formControlName","password","autocomplete","new-password"],["matInput","","type","password","formControlName","passwordConfirm","autocomplete","new-password"],["mat-button","","type","submit","color","primary",3,"disabled"],["mode","indeterminate"]],template:function(e,t){1&e&&(r.TgZ(0,"form",0),r.NdJ("onSubmit",function(){return t.onRegistrationSubmit()}),r.YNc(1,H,1,0,"mat-progress-bar",1),r.ALo(2,"async"),r.TgZ(3,"mat-form-field",2)(4,"mat-label"),r._uU(5,"Email"),r.qZA(),r._UZ(6,"input",3),r.YNc(7,V,2,0,"mat-error",4),r.YNc(8,k,2,1,"mat-error",4),r.qZA(),r.TgZ(9,"mat-form-field",2)(10,"mat-label"),r._uU(11,"First name"),r.qZA(),r._UZ(12,"input",5),r.YNc(13,_,2,1,"mat-error",4),r.qZA(),r.TgZ(14,"mat-form-field",2)(15,"mat-label"),r._uU(16,"Last name"),r.qZA(),r._UZ(17,"input",6),r.YNc(18,rr,2,1,"mat-error",4),r.qZA(),r.TgZ(19,"mat-form-field",2)(20,"mat-label"),r._uU(21,"Password"),r.qZA(),r._UZ(22,"input",7),r.YNc(23,or,2,1,"mat-error",4),r.qZA(),r.TgZ(24,"mat-form-field",2)(25,"mat-label"),r._uU(26,"Password confirm"),r.qZA(),r._UZ(27,"input",8),r.YNc(28,tr,2,0,"mat-error",4),r.qZA(),r.TgZ(29,"button",9),r.ALo(30,"async"),r._uU(31," Register "),r.qZA()()),2&e&&(r.Q6J("formGroup",t.registrationForm),r.xp6(1),r.Q6J("ngIf",r.lcZ(2,9,t.isLoading$)),r.xp6(6),r.Q6J("ngIf",t.registrationForm.controls.email.hasError("email")),r.xp6(1),r.Q6J("ngIf",t.registrationForm.controls.email.hasError("appError")),r.xp6(5),r.Q6J("ngIf",t.registrationForm.controls.firstName.hasError("appError")),r.xp6(5),r.Q6J("ngIf",t.registrationForm.controls.lastName.hasError("appError")),r.xp6(5),r.Q6J("ngIf",t.registrationForm.controls.password.hasError("appError")),r.xp6(5),r.Q6J("ngIf",t.registrationForm.controls.passwordConfirm.hasError("match")),r.xp6(1),r.Q6J("disabled",r.lcZ(30,11,t.isLoading$)))},dependencies:[c.O5,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,l.TO,l.KE,l.hX,w.lW,b.pW,N.Nt,c.Ov],styles:["[_nghost-%COMP%]{display:block}.registration-form[_ngcontent-%COMP%]{display:flex;flex-direction:column}"],changeDetection:0}),g=(0,x.gn)([(0,d.V)()],g);const er=[{path:"",title:"Login page",component:W,canActivate:[F]},{path:"registration",title:"Login page",component:(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["camp-registration-page"]],decls:1,vars:0,consts:[[1,"registration-form"]],template:function(t,i){1&t&&r._UZ(0,"camp-registration-form",0)},dependencies:[g],styles:[".registration-form[_ngcontent-%COMP%]{max-width:400px;margin:0 auto}[_nghost-%COMP%]{display:block;height:100%}"],changeDetection:0}),o})(),canActivate:[F]}];let nr=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[c.ez,I.m,h.Bz.forChild(er),S.q]}),o})()}}]);