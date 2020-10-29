export default function CreateAccountValidations(values) {
	
	let errors = {};

	if(!values.nombre) {
		errors.nombre ="El nombre es obligatorio"
	}

	if(!values.email) {
		errors.email = "El mail es obligatorio";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
		errors.email = "El mail no es valido"
	}

	if(!values.password) {
		errors.password = "El password es obligatorio";
	}else if (values.password.length < 6 ) {
		errors.password = "El password debe tener al menos 6 caracteres"
	}

	return errors;
}