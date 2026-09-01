import { useState } from 'react';

export function useForm({ defaultValues = {} } = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const register = (name, rules = {}) => {
    return {
      name,
      value: values[name] !== undefined ? values[name] : '',
      onChange: (e) => {
        const val = e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
        setValues((prev) => ({ ...prev, [name]: val }));
        if (errors[name]) {
          setErrors((prev) => {
            const copy = { ...prev };
            delete copy[name];
            return copy;
          });
        }
      }
    };
  };

  const setValue = (name, val) => {
    setValues((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (onSubmit) => (e) => {
    if (e && e.preventDefault) e.preventDefault();
    onSubmit(values);
  };

  const reset = (newValues = defaultValues) => {
    setValues(newValues);
    setErrors({});
  };

  return {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch: (name) => (name ? values[name] : values)
  };
}
