
export const date = (data: Date, options: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat('pt-BR', options).format(data)
}
