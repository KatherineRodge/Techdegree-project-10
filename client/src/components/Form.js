import React from 'react'

export default (props) => {
  const {
      cancel,
      errors,
      submit,
      submitButtonText,
      elements,
    } = props;

    function handleSubmit(event) {
      event.preventDefault();
      submit();
    }

    function handleCancel(event) {
      event.preventDefault();
      cancel();
    }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

//handles validation errors
function ErrorsDisplay({errors}) {
  let errorsDisplay = null;

  if (errors.length > 0) {
    let errorsString = errors.split(',');
    console.log(errors);
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation Errors</h2>
        <div className="validation-errors">
          <ul>
            {errorsString.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
