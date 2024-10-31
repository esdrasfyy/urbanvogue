function formatCpf(value: string) {
  const country = ["pt", "en"];

  value = value.replace(/\D/g, "");

  switch (country[0]) {
    case "pt":
      value = value.slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})/, "$1-$2");
      return value;

    case "en":
      value = value.slice(0, 9);
      value = value.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
      return value;

    default:
      return value;
  }
}
