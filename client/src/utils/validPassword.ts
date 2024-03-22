
export default function validPassword(password:string):boolean {
  if (password.length < 6) {
    return false;
  }

  // Проверка наличия хотя бы одной маленькой буквы
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Проверка наличия хотя бы одной большой буквы
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Проверка наличия хотя бы одной цифры
  if (!/\d/.test(password)) {
    return false;
  }

  // Если все проверки пройдены, пароль считается валидным
  return true;
}
