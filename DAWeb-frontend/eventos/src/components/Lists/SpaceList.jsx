import { Accordion } from 'react-bootstrap';

const SpaceList = ({ items, itemExpandido, onExpand, onSave, isSaving, CardComponent }) => (
  <Accordion activeKey={itemExpandido?.toString()}>
    {items.map((item) => (
      <CardComponent
        key={item.resumen.id}
        item={item}
        onExpand={() => onExpand(item.resumen.id)}
        onSave={onSave}
        isSaving={isSaving}
      />
    ))}
  </Accordion>
);

export default SpaceList;
