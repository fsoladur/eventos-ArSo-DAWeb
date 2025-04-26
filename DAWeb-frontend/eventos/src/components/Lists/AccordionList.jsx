import { Accordion } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AccordionList = ({ items, itemExpandido, onExpand, onSave, isSaving, CardComponent, ...additionalProps }) => (
  <Accordion activeKey={itemExpandido?.toString()}>
    {items.map((item) => (
      <CardComponent
        key={item.id}
        item={item}
        onExpand={() => onExpand(item.id)}
        onSave={onSave}
        isSaving={isSaving}
        {...additionalProps}
      />
    ))}
  </Accordion>
);

AccordionList.propTypes = {
  items: PropTypes.array.isRequired,
  itemExpandido: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onExpand: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  isSaving: PropTypes.bool,
  CardComponent: PropTypes.elementType.isRequired
};

export default AccordionList;
