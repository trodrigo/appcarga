export class Utils {

  validaCnpj(cnpj: string) {
    if (!cnpj) return false

    // Aceita receber o valor como string, número ou array com todos os dígitos
    const isString = typeof cnpj === 'string'
    const validTypes = isString || Number.isInteger(cnpj) || Array.isArray(cnpj)

    // Elimina valor em formato inválido
    if (!validTypes) return false

    // Filtro inicial para entradas do tipo string
    if (isString) {
      // Limita ao máximo de 18 caracteres, para CNPJ formatado
      if (cnpj.length > 18) return false

      // Teste Regex para veificar se é uma string apenas dígitos válida
      const digitsOnly = /^\d{14}$/.test(cnpj)
      // Teste Regex para verificar se é uma string formatada válida
      const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(cnpj)

      // Se o formato é válido, usa um truque para seguir o fluxo da validação
      if (digitsOnly || validFormat) true
      // Se não, retorna inválido
      else return false
    }

    // Guarda um array com todos os dígitos do valor
    const match = cnpj.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []

    // Valida a quantidade de dígitos
    if (numbers.length !== 14) return false

    // Elimina inválidos com todos os dígitos iguais
    // const items = [...new Set(numbers)]
    // if (items.length === 1) return false
    if (cnpj === '00000000000000' || cnpj === '11111111111111' ||
      cnpj === '22222222222222' || cnpj === '33333333333333' ||
      cnpj === '44444444444444' || cnpj === '55555555555555' ||
      cnpj === '66666666666666' || cnpj === '77777777777777' ||
      cnpj === '88888888888888' || cnpj === '99999999999999') {
      return false;
    }

    // Cálculo validador
    const calc = (x: any) => {
      const slice = numbers.slice(0, x)
      let factor = x - 7
      let sum = 0

      for (let i = x; i >= 1; i--) {
        const n = slice[x - i]
        sum += n * factor--
        if (factor < 2) factor = 9
      }

      const result = 11 - (sum % 11)

      return result > 9 ? 0 : result
    }

    // Separa os 2 últimos dígitos de verificadores
    const digits = numbers.slice(12)

    // Valida 1o. dígito verificador
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false

    // Valida 2o. dígito verificador
    const digit1 = calc(13)
    return digit1 === digits[1]
  }

  emailValido(email: string) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    return emailRegex.test(email);
  }
}