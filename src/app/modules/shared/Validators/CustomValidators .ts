import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export class CustomValidators {
    public static maxDigits(max: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const isValid = control.value ? control.value.toString().length <= max : true;
            return isValid ? null : { maxDigits: { max } };
        };
    }

    public static passwordPattern(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const value = control.value;
            const hasNumber = /[0-9]/.test(value);
            const hasNonNumber = /[^0-9]/.test(value);

            if (hasNumber && hasNonNumber) {
                return null;
            } else {
                return { passwordPattern: 'יש להזין סיסמה עם לפחות תו אחד מספר ותו אחד שאינו מספר' };
            }
        };
    }

    // static passwordsMatch(control: AbstractControl): { [key: string]: any } | null {
    //     const password = control.get('password');
    //     const confirmPassword = control.get('confirmPassword');
    //     return password && confirmPassword && password.value !== confirmPassword.value ? { passwordsMatch: true } : null;
    // }
}
