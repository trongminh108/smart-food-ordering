import {
    STATUS_ACTIVE,
    STATUS_ALL,
    STATUS_FAILED,
    STATUS_SUCCESS,
} from '@/app/constants/backend';
import Form from 'react-bootstrap/Form';

function FilterTypeOrder({ onChange }: { onChange: any }) {
    return (
        <Form.Select aria-label="Default select example" onChange={onChange}>
            <option value={STATUS_ALL}>Tất cả</option>
            <option value={STATUS_ACTIVE}>Đang giao</option>
            <option value={STATUS_SUCCESS}>Thành công</option>
            <option value={STATUS_FAILED}>Thất bại</option>
        </Form.Select>
    );
}

export default FilterTypeOrder;
