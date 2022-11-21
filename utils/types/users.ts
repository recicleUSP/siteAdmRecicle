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
	phone: string,
	phonealt?: string,
	address: {
		street: string,
		street_number: number,
		cep: string
	}
}

export interface Manager {
	name: string,
	cpf: string,
	email: string,
	phone: string,
	institution_id?: any
}