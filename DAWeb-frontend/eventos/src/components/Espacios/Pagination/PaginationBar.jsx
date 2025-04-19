import { Pagination } from 'react-bootstrap';

const PaginationBar = ({ totalPaginas, paginaActual, onPageChange }) => (
  <Pagination className="justify-content-center mt-4">
    {Array.from({ length: totalPaginas }, (_, i) => (
      <Pagination.Item
        key={i + 1}
        active={i + 1 === paginaActual}
        onClick={() => onPageChange(i + 1)}
      >
        {i + 1}
      </Pagination.Item>
    ))}
  </Pagination>
);

export default PaginationBar;
