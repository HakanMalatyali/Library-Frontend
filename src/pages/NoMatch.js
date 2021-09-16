import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Divider } from 'semantic-ui-react'

export default function NoMatch() {
    return (
        <div>
        <p style = {{fontSize: "30px",fontFamily : "Cursive"}}>
        Geçersiz bir URL girdiniz aşağıda bulunan sekmelerden birine gidiniz 
        </p>
        <Divider />
        <Button.Group widths='2'>
          <Button as={NavLink} to="/">Ana Sayfa</Button>
          <Button as={NavLink} to="/book/add">Ürün Ekle</Button>
        </Button.Group>
      </div>
    )
}
