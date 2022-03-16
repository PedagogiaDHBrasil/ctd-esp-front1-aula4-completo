import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextoFormulario } from "../../context/contextoFormulario";

/**
 * Componente que manipula os inputs do formulário.
 *
 * @param {{
 *    name: string,
 *    label: string,
 *    type: string,
 *    isPokemon: boolean,
 *    shouldFocus: boolean,
 * }} props
 * @returns
 */
const Input = ({
  name,
  label,
  type = "text",
  shouldFocus = false,
  isPokemon = false,
}) => {
  const ref = useRef();

  const { handleInputBlur, formulario } = useContext(ContextoFormulario);

  const [value, setValue] = useState(formulario[name] || "");

  /**
   * Função que é executada ao alterar o valor do input.
   *
   * @param {Event} e
   */
  const onChange = (e) => setValue(e.target.value);

  /**
   * Função que é executada ao perder o foco do input.
   *
   * @param {Event} e
   */
  const onBlur = (e) => {
    e.preventDefault();

    handleInputBlur(
      isPokemon ? "ATUALIZAR_POKEMON" : "ATUALIZAR_TREINADOR",
      {
        campo: name,
        valor: value,
      }
    );
  };

  useEffect(() => {
    if (ref.current && shouldFocus) {
      ref.current.focus();
    }
  }, [shouldFocus]);

  return (
    <div className="input-receptor">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </div>
  );
};

export default Input;
