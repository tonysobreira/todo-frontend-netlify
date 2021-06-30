import React, { useState, useEffect } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Chips } from 'primereact/chips';
import { Dialog } from 'primereact/dialog';
import { TodoService } from 'service/TodoService';

export const TodoPage = () => {

    const todoService = new TodoService();
    
    const [todo, setTodo] = useState({
        id: 0,
        url: "",
        items: []
    });    

    const [item, setItem] = useState({
        id: 0,
        description: ""
    });

    const [itemDialog, setItemDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [subItemDialog, setSubItemDialog] = useState(false);
    const [checked, setChecked] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [shareDialog, setShareDialog] = useState(false);
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        let path = window.location.pathname;
        path = path.replace("/", "");

        todoService.getTodo(path).then(data => setTodo(data));
    }, []);

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New Item" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={addItem} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Delete this Todo" icon="pi pi-trash" className="p-button-danger p-mr-2" onClick={onDeleteTodo} />
            </React.Fragment>
        )
    }

    const addItem = () => {
        todoService.addItem(todo.url).then(data => setTodo(data));
    }

    const onItemChange = (e) => {
        todoService.checkItem(todo.url, e.value.id).then(data => setTodo(data));
    }

    const onItemDelete = (e) => {
        todoService.deleteItem(todo.url, e.id).then(data => setTodo(data));
    }

    const onAddSubItem = (e) => {
        todoService.addSubItem(todo.url, e.id).then(data => setTodo(data));
    }

    const onEditItem = (e) => {
        setItem(e);
        setItemDialog(true);
    }

    const itemDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => hideDialog()} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={() => saveItem()} />
        </React.Fragment>
    )

    const hideDialog = () => {
        setSubmitted(false);
        setItemDialog(false);
    }

    const saveItem = (e) => {
        setSubmitted(true);
        todoService.updateItem(todo.url, item.id, item.description).then(data => setTodo(data)).then(setItemDialog(false));
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _item = { ...item };
        _item[`${name}`] = val;
        setItem(_item);
    }

    const onDeleteTodo = () => {
        todoService.deleteTodo(todo.url);
    }

    const subItemDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => hideSubItemDialog()} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={() => saveSubItem()} />
        </React.Fragment>
    )

    const hideSubItemDialog = () => {
        setSubmitted(false);
        setSubItemDialog(false);
    }

    const saveSubItem = (e) => {
        setSubmitted(true);
        todoService.updateItem(todo.url, item.id, item.description, checked, selectedItem)
            .then(data => setTodo(data))
            .then(setSubItemDialog(false), setChecked(false), setItem({ id: 0, description: "" }), setSelectedItem(null));
    }

    const onEditSubItem = (e) => {
        setItem(e);
        setChecked(false);
        setSubItemDialog(true);
    }

    const onSelectChange = (e) => {
        setSelectedItem(e.value);
    }

    const shareDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => hideShareDialog()} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={() => saveShare()} />
        </React.Fragment>
    )

    const hideShareDialog = () => {
        setSubmitted(false);
        setEmails([]);
        setShareDialog(false);
    }

    const saveShare = () => {
        setSubmitted(true);
        todoService.shareTodo(todo.url, emails)
            .then(setEmails([]), setShareDialog(false));
    }

    const onShareTodo = () => {
        setShareDialog(true);
    }

    return (
        <>
            {(window.location.pathname === '/' || window.location.pathname.replace("/", "") === 'about') ? <div></div> :
                <div>
                    <div className="card">
                        <p>Url: {todo.url}</p>
                        <Button label="Share this Todo" icon="pi pi-share-alt"
                            className="p-button-rounded p-button-info"
                            style={{ marginLeft: "1em" }}
                            onClick={() => onShareTodo()} />
                        <hr />

                        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} ></Toolbar>

                        {
                            todo.items.map((item) => {
                                return (
                                    <>
                                        <div key={item.id} className="p-field-checkbox">
                                            <Checkbox inputId={String(item.id)}
                                                name="item"
                                                value={item}
                                                checked={item.done}
                                                onChange={onItemChange} />
                                            <label htmlFor={item.id} style={{ textDecoration: item.done ? "line-through" : "none" }}>
                                                {item.description}
                                            </label>
                                            <Button icon="pi pi-plus"
                                                className="p-button-rounded p-button-success"
                                                style={{ marginLeft: "1em" }}
                                                onClick={() => onAddSubItem(item)} />
                                            <Button icon="pi pi-pencil"
                                                className="p-button-rounded p-button-info"
                                                style={{ marginLeft: "1em" }}
                                                onClick={() => onEditItem(item)} />
                                            <Button icon="pi pi-trash"
                                                className="p-button-rounded p-button-danger"
                                                style={{ marginLeft: "1em" }}
                                                onClick={() => onItemDelete(item)} />
                                        </div>
                                        {
                                            item.subItems.map((subItem) => {
                                                return (
                                                    <div key={subItem.id} className="p-field-checkbox" style={{ marginLeft: "2em" }}>
                                                        <Checkbox inputId={String(subItem.id)}
                                                            name="item"
                                                            value={subItem}
                                                            checked={subItem.done}
                                                            onChange={onItemChange} />
                                                        <label htmlFor={subItem.id} style={{ textDecoration: subItem.done ? "line-through" : "none" }}>
                                                            {subItem.description}
                                                        </label>
                                                        <Button icon="pi pi-pencil"
                                                            className="p-button-rounded p-button-info"
                                                            style={{ marginLeft: "1em" }}
                                                            onClick={() => onEditSubItem(subItem)} />
                                                        <Button icon="pi pi-trash"
                                                            className="p-button-rounded p-button-danger"
                                                            style={{ marginLeft: "1em" }}
                                                            onClick={() => onItemDelete(subItem)} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </>

                                )
                            })
                        }

                    </div>

                    <Dialog visible={itemDialog}
                        style={{ width: '450px' }}
                        header="Edit Item"
                        modal
                        className="p-fluid"
                        footer={itemDialogFooter}
                        onHide={hideDialog}>
                        <div className="p-field">
                            <label htmlFor="description">Description</label>
                            <InputText id="description"
                                value={item.description}
                                onChange={(e) => onInputChange(e, 'description')}
                                required
                                autoFocus
                                className={{ 'p-invalid': submitted && !item.description }} />

                            {submitted && !item.description && <small className="p-error">Description is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={subItemDialog}
                        style={{ width: '600px' }}
                        header="Edit Sub Item"
                        modal
                        className="p-fluid"
                        footer={subItemDialogFooter}
                        onHide={hideSubItemDialog}>
                        <div className="p-field" style={{ height: '600px' }}>
                            <label htmlFor="description">Description</label>
                            <InputText id="description"
                                value={item.description}
                                onChange={(e) => onInputChange(e, 'description')}
                                required
                                autoFocus
                                className={{ 'p-invalid': submitted && !item.description }} />

                            {submitted && !item.description && <small className="p-error">Description is required.</small>}
                            <hr />
                            <label>Tornar pai</label>
                            <div className="p-field-checkbox">
                                <Checkbox inputId="move-up"
                                    checked={checked}
                                    onChange={e => setChecked(e.checked)} />
                                <label htmlFor="move-up">{checked ? 'Sim' : 'Não'}</label>
                            </div>
                            <hr />
                            {checked ? <div></div> :
                                <div>
                                    <label>Tornar filho de</label>
                                    <Dropdown
                                        value={selectedItem}
                                        options={todo.items}
                                        onChange={onSelectChange}
                                        optionLabel="description"
                                        placeholder="Selecione um item" />
                                </div>
                            }
                        </div>
                    </Dialog>

                    <Dialog visible={shareDialog}
                        style={{ width: '600px' }}
                        header="Share Todo"
                        modal
                        className="p-fluid"
                        footer={shareDialogFooter}
                        onHide={hideShareDialog}>

                        <div className="p-field" style={{ height: '200px' }}>
                            <label>Type an email and press Enter</label>
                            <br />
                            <label>You can add more than one</label>
                            <br />
                            <label>Emails:</label>
                            <Chips
                                value={emails}
                                onChange={(e) => setEmails(e.value)} />
                        </div>
                    </Dialog>
                </div>

            }
        </>
    );

}
