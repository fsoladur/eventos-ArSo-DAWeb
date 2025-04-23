import { Accordion } from 'react-bootstrap';

const SpaceList = ({ items, itemExpandido, onExpand, onSave, isSaving, CardComponent }) => (
  <Accordion activeKey={itemExpandido?.toString()}>
    {items.map((item) => (
      <CardComponent
        key={item.id}
        item={item}
        onExpand={() => onExpand(item.id)}
        onSave={onSave}
        isSaving={isSaving}
      />
    ))}
  </Accordion>
);

export default SpaceList;
