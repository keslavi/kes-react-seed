import { useEffect } from "react";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useNavigate, /*NavLink,*/ useParams } from "react-router-dom";
import { store } from "store";
import dayjs from "dayjs";

//prettier-ignore
import {
  Col,
  FormProvider,
  useFormProvider,
  Input,
  Row,
  TextareaDebug,
  Fieldset,
} from "@formhelper";

import { BtnContinueSave } from "components";

//prettier-ignore
import {
  resolver,
  //errorNotification
} from "./validation-task";

export const Task = () => {
  const item = store.use.task();
  const taskRetrieve = store.use.taskRetrieve();
  const taskUpsert = store.use.taskUpsert();
  const option = store.use.option();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    taskRetrieve(id);
  }, []);

  const frmMethods = useFormProvider({
    resolver,
    mode: "onBlur",
    reValidateMode: "onChange"
  });
  const { reset } = frmMethods;
  // end React hook form and validation***********************

  useEffect(() => {
    if (!isEmpty(item)) {
      reset(item);
    }
  }, [item]);

  // DO NOT SUBMIT HERE; it's done in BtnContinueSave
  // you can also check window.isDraft to see if continue or save (isDraft=true) was clicked
  const onClickContinueSave = (e) => {
    const id = e.currentTarget.id;
    switch (id) {
      case "btnContinue":
        //alert("btnContinueSave. additional logic here if needed");
        e.currentTarget.form.requestSubmit();
        break;
      case "btnSave":
        alert("btnSave. additional logic here if needed");
        break;
      default:
        toast.error(`onClickContinueSave: unknown id: ${id}`);
    }
  }

  const onSubmit = (values) => {
    //note:  values can't get here prior to form & business validation
    toast.info(
      <div>
        Submit clicked
        <br />
        <textarea
          rows={5}
          cols={30}
          defaultValue={JSON.stringify(values, null, 2)}
        ></textarea>
      </div>
    );
    taskUpsert(values);
  };

  const onDelete = () => {
    const values = { ...item };
    //actTask_D(values);
    navigate("/dev/tasks");
  };

  const onCancel = () => {
    navigate("/dev/tasks");
  };

  if (isEmpty(item) || isEmpty(option)) return <div>loading...</div>;
  return (
    <>
      <br /> {/* account for navSticky */}
      <br /> {/* account for navSticky */}
      <Row>
        <Col size={12}>
          <h4>Task</h4>
        </Col>
      </Row>
      <FormProvider formMethods={frmMethods} onSubmit={onSubmit}>
        <BtnContinueSave
          onClickContinueSave={onClickContinueSave}
        />
        <button
          type="button"
          id="btnTestNavigation"
          onClick={() => navigate('/whatever')}
        >
          testNavigation
        </button>

        <div className="hidden">
          <Row>
            <div className="hidden"> Col is INSIDE Input</div>
            <Input name="id" />
          </Row>
        </div>
        <Fieldset>
          <Row>
            <div className="hidden"> Col is INSIDE Input</div>
            <Input
              //size={{xs:4,xm:7}} //size={4} muiv7 Grid uses size
              name="subject"
              label="Subject"
              info="header|body"
            //info={<font color='red'>object support</font>}
            />
            <Input name="body" label="Body" />
            <Input
              name="userAssigned"
              label="Assigned To"
              disabled={true}
              info="Auto-populated from Windows authentication"
            />
          </Row>
        </Fieldset>
        <br />
        <Fieldset>
          <Row>
            <Input
              name="names"
              label="Names"
              optionsCheckbox={
                option.task.status /*["steve","cindy", "riley", "whatever"]*/
              }
            />
          </Row>

          <Row>
            <Input name="status" label="Status" options={option.task.status} info="header2|body2" />
            {/* <Select name="status" label="Status" options={option.status} /> */}
            <Input name="result" label="Result" options={option.task.result} />
            <Input
              datepicker
              name="dfrom"
              label="From"
              max={dayjs()}
            //min={dayjs().subtract(125, 'year').format('YYYY-MM-DD')}
            />
          </Row>
        </Fieldset>
        <br />
        <Fieldset>
          <Row>
            <Input
              name="references"
              label="References"
              arrayInput={true}
              placeholder="Add a link or reference"
              info="Add URLs or reference links (e.g., Google Maps, documentation)"
            />
          </Row>
        </Fieldset>
      </FormProvider>
      <TextareaDebug value={{ item, option }} />
    </>
  );
};
export default Task;
