import {AbstractControl, FormGroup} from '@angular/forms';

export const Regex = {
    unicode: '[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$',
    unicodeAndNumber: '[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s0-9]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$',
    email: '^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$',
    phone: '^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$',
    codeColor:'\\#(\\w+){6,}'
}

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function compareDate( startDate: string , endDate: string ){
    return ( formGroup: FormGroup ) => {
        const startDateControl = formGroup.controls[startDate] ;
        const endDateControl = formGroup.controls[endDate] ;

        const options = { month: "long", day: "numeric", year: "numeric" };

        // @ts-ignore
        const a = new Intl.DateTimeFormat("en-US", options).format(new Date(startDateControl.value));
        // @ts-ignore
        const b = new Intl.DateTimeFormat("en-US", options).format(new Date(endDateControl.value));
        // @ts-ignore
        const c = new Intl.DateTimeFormat("en-US", options).format(new Date());
        const c1 = new Date( new Date().getFullYear() , new Date().getMonth() , new Date().getDate() - 1) ;
        const a1 = new Date(startDateControl.value)
        const b1 = new Date(endDateControl.value )

        if( c1 >= a1 ) {
            startDateControl.setErrors({compareStart: true})
        }else {
            startDateControl.setErrors(null);
        }

        if( a > b || a1 > b1){
            endDateControl.setErrors({compareDate: true});
        }else {
            endDateControl.setErrors(null) ;
        }
    }
}

export function checkDiscount( c: AbstractControl ){
    const b = c.value ;
    if( b <= 0 || b > 99){
        return {isDiscount: true}
    }
    return null ;
}

export function checkSpace( c: AbstractControl ) {
    return ( c.value.trim() == '' ) ? {
        isSpace: true
    }: null ;
}
