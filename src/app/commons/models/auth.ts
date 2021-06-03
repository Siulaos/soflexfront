export interface IRQLogin {
  username: string;
  password: string;
}

export interface IToken {
  access_token: string;
}

export interface IJwt {
	exp: number;
	role: string;
	username: string;
}

