import { useEffect, useState } from "react";
import { color } from "@/theme-material"
import { toast } from "react-toastify";
import {
  AppBar,
  Button,
  Toolbar,
} from "@mui/material";

import { ModalConfirmExit } from "components";
import { useFormContext } from "components";
//import { store } from '@/store';

export const BtnContinueSave = (props) => {
  /*
    we are setting an isDraft variable in global window object
    when then component is mounted, so we clean when unmounted
  */

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Get form context to access errors and form methods
  const { errors, formMethods } = useFormContext();

  useEffect(() => {
    return () => {
      delete window.isDraft;
    };
  }, []);

  const { confirmExit } = props;

  const textContinue = props.textContinue || "Continue";
  const textSave = props.textSave || "Save";
  const disableButton = props.disabled || false;

  // Check if there are any form errors
  const hasErrors = errors && Object.keys(errors).length > 0;

  const onClickContinueSave = (e) => {
    e.preventDefault();
    
    // Prevent submission if there are validation errors
    if (hasErrors) {
      toast.error("Please fix the validation errors before submitting.");
      return;
    }
    
    const id = e.currentTarget.id;
    switch (id) {
      case "btnContinue":
        window.isDraft = false;
        break;
      case "btnSave":
        if (confirmExit && !window.isDraft) {
          toggleModal();
          return;
        }
        window.isDraft = true;
        break;
      default:
        toast.error(`onClickContinueSave ${id} not found`);
        return;
    }

    if (props.onClickContinueSave) {
      props.onClickContinueSave(e);
      return;
    }
    
    // Use form's handleSubmit instead of requestSubmit to ensure validation
    if (formMethods && formMethods.handleSubmit) {
      // Trigger form submission through React Hook Form
      const form = e.currentTarget.form;
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
    } else {
      // Fallback to requestSubmit if form methods not available
      e.currentTarget.form.requestSubmit();
    }
  }

  const onModalConfirm = (e) => {
    window.isDraft = true;
    if (props.onClickContinueSave) {
      props.onClickContinueSave(e);
      return;
    }
    
    // Use form's handleSubmit instead of requestSubmit
    if (formMethods && formMethods.handleSubmit) {
      const form = e.currentTarget.form;
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
    } else {
      e.currentTarget.form.requestSubmit();
    }
  }


  return (
    <>
      <ModalConfirmExit
        isOpen={isModalOpen}
        toggle={toggleModal}
        onConfirm={onClickContinueSave}
      />
      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          boxShadow: 'none',
          zIndex: 3000,
        }}
      >
        <Toolbar
          disableGutters
          variant="dense"
          sx={{
            px: 2,
            boxShadow: "none",
            bgcolor: color.primary.white,
            //color: color.primary.blue,
          }}>
          &nbsp;&nbsp;
          <Button
            id="btnContinue"
            variant="contained"
            disabled={disableButton || hasErrors}
            onClick={onClickContinueSave}
          >
            {textContinue}
          </Button>
          &nbsp;&nbsp;
          <Button
            id="btnSave"
            onClick={onClickContinueSave}
            variant="outlined"
            disabled={disableButton || hasErrors}
          >
            {textSave}
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
