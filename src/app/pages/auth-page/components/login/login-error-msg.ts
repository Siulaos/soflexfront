export interface IAttribute {
	formControlName: string;
	validators: IValidator[];
}

export interface IValidator {
	name: string;
	message: string;
}

// export function customValidator(): ValidatorFn {
// 	return (control: AbstractControl): ValidationErrors | null => {
// 		const value = control.value as string;
// 		if (!value.includes('*')) {
// 			return { custom1: true };
// 		}

// 		if (!value.includes('$')) {
// 			return { custom2: true };
// 		}
// 		return null;
// 	};
// }

export const MODEL_LOGIN_ERRORS: IAttribute[] = [
	{
		formControlName: 'username',
		validators: [
			{
				name: 'required',
				message: 'Usuario requerido'
			}
		]
	},
	{
		formControlName: 'password',
		validators: [
			{
				name: 'required',
				message: 'Contraseña requerida'
			}
		]
	}
];
