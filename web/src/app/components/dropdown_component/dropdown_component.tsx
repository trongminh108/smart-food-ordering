import Form from 'react-bootstrap/Form';

function DropdownComponent({ onChange, data }: { onChange: any; data: any }) {
    return (
        <Form.Select aria-label="Default select example" onChange={onChange}>
            {data.map((option: any) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </Form.Select>
    );
}

export default DropdownComponent;
