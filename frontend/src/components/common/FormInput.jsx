const FormInput=({label, type, placeholder, register, error, name, isPassword, showPassword, togglePassword})=>{
    return(
        <div className="mb-4">
            <label htmlFor={name} className="form-label fw-semibold">
                {label}
            </label>

            <div className="position-relative">
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    {...register}
                />

                {isPassword && (<i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} position-absolute top-50 end-0 translate-middle-y me-3`} onClick={togglePassword}></i>)}
            </div>

            {error && (
                <div className="d-block invalid-feedback text-danger position-absolute">
                    {error.message}
                </div>
            )}
        </div>
    )
}

export default FormInput;