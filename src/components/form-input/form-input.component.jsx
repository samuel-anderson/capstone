import { Group, FormInputLabel, Input } from "./form-input.styles";

const FormInput = ({ label, inputOptions }) => {
  console.log(inputOptions.value.length);
  return (
    <Group>
      <Input {...inputOptions} />

      {label && (
        <FormInputLabel shrink={inputOptions.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
