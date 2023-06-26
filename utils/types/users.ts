export interface Institution {
	name: string,
	email: string,
	phone: string,
	cnpj: string,
	address: {
		street: string,
		street_number: number,
		cep: string
		state_inscription: number
	},
    pickers_count: number,
}

export interface Picker {
	institution_id: string,
	name: string,
	email: string,
	birthday: Date,
	cpf: string,
	rg: string,
	password: string,
	phone: string,
	phonealt?: string,
	pickers_count: number,
	rating: number,
	address: {
		street: string,
		street_number: number,
		cep: string
	}
}

interface User {
	name: string;
	email: string;
	cpf: string;
	phone: string;
	birthDate: Date;
}

export interface Manager extends User {
	cnpj?: string;
}