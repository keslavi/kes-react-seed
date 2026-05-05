import { 
  Col, 
  Row,
  Fieldset,
  Icon,
  iconType as it,
  LabelHeading,
  labelHeadingVariant as lv,
} from "components";


export const IconSection = () => {

  const renderIcons = () => {
    return Object.entries(it)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, IconComponent]) => {
        return (
          <Row key={key}>
            <Col size={1}><Icon src={IconComponent}/></Col>
            <Col flex>{key}</Col>
          </Row>
        );
      });
  }
  return (
    <>
      <Fieldset>
        <h2>Icons</h2>
        <h4 data-h4-color-alt>default size is md, only showing all 3 once.</h4>
        <Row>
          <Col size={2}>
            complete (sm,md,lg)
            <br/>md is default
          </Col>
          <Col size={2}>
            <Icon src={it.complete} size="sm"/> &nbsp;
            <Icon src={it.complete} size="md"/> &nbsp;
            <Icon src={it.complete} size="lg"/> &nbsp;
          </Col>
          <Col flex>
            accordion/expand icons (click to toggle):
            <br/>
            <Icon src={it.accordion}/> &nbsp; {`<Icon src={it.accordion}/>`}
            <br/>
            <Icon src={it.accordion} expanded={true}/> &nbsp; {`<Icon src={it.accordion} expanded={true}/>`} 
            <br/>expanded is just INITIAL state, no need to handle on the page
          </Col>
        </Row>
        <Row><Col size={12}>(Note: some icons are aliased, they aren't duplicates.)</Col></Row>
        {renderIcons()}
      </Fieldset>
    </>
  );
};