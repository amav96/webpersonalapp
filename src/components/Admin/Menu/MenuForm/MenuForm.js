import React from 'react';
import { Form, Dropdown, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema} from "./MenuForm.form";

const menuController = new Menu();

export  function MenuForm(props) {
    const { onClose, onReload, menu } = props;
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(menu),
        validationSchema: validationSchema(menu),
        validationOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const data = {
                    title: formValue.title,
                    path: formValue.protocol + formValue.path,
                    order: formValue.order,
                    active: formValue.active
                }
                if(menu){
                    data.path = formValue.path;
                    await menuController.update(accessToken,menu._id, data);
                }else{
                    await menuController.save(accessToken,data);
                }
                onReload();
                onClose();
                console.log({formValue})
            } catch (error) {

            }
        }
    })
  return (
    <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal"  >
            <Form.Input
            name="title"
            placeholder="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
            />
            <Form.Input
            type="number"
            name="order"
            placeholder="order"
            onChange={formik.handleChange}
            value={formik.values.order}
            error={formik.errors.order}
            />
        </Form.Group>

        <Input
        name="path"
        placeholder="URL"
        fluid
        onChange={formik.handleChange}
        value={formik.values.path}
        error={formik.errors.path}
        label={!menu ?
        <Dropdown
            options={options}
            onChange={(_,data) => formik.setFieldValue("protocol", data.value)}
            value={formik.values.protocol}
            error={formik.errors.protocol}
            /> : null}
        />

        <Form.Group/>

        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
            {menu ? "Actualizar menu": "Crear menu"}
        </Form.Button>
    </Form>
  )
}

const options = [
    { key: "https://", text: "https://", value: "https://"},
    { key: "http://", text: "http://", value: "http://"},
    { key: "/", text: "/", value: "/"},
];