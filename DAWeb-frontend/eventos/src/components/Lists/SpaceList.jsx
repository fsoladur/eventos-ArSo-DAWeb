import { Accordion } from 'react-bootstrap';

const SpaceList = ({ items, itemExpandido, onExpand, CardComponent }) => (
  <Accordion activeKey={itemExpandido?.toString()}>
    {console.log('item', CardComponent)}
    {items.map((item) => (
      <CardComponent
        key={item.resumen.id}
        item={item}
        onExpand={() =>
          onExpand(itemExpandido === item.resumen.id ? null : item.resumen.id)
        }
      />
    ))}
  </Accordion>
);

export default SpaceList;
