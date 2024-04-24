import Form from 'react-bootstrap/Form';

function DropdownComponent({
    onChange,
    data,
    defaultVal = '',
}: {
    onChange: any;
    data: any;
    defaultVal?: string;
}) {
    return (
        <Form.Select
            aria-label="Default select example"
            onChange={onChange}
            defaultValue={defaultVal}
        >
            {data.map((option: any) => {
                return (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                );
            })}
        </Form.Select>
    );
}

export default DropdownComponent;
