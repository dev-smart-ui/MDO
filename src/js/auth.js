let keepSigned = false;

const signInSubmit = (event) => {
  event?.stopPropagation();
  const email = $("#signIn-email").val();
  const password = $("#signIn-password").val();
  
  $('#header_nav').addClass('authorized-user');
  $('#header_nav').removeClass('not-authorized-user');
};

const checkBoxHandler = () => {
  const checkBox = $(".signIn-modal-options-check-input");
  const checked = checkBox.hasClass("checked");
  keepSigned = !checked;
  checkBox[checked ? "removeClass" : "addClass"]("checked");
};
