import { Button } from '@nextui-org/react';
import { ReactPainter } from 'react-painter';

//chyba napisać bedzie treba samemu

export default function Paint() {

    const size = JSON.parse(sessionStorage.getItem("paintWH")!)
    console.log(size)
    return (
        <ReactPainter
        width={size.width}
        height={size.height}
        initialColor='#d7a3e1'
        onSave={blob => console.log(blob)}
        render={({ triggerSave, canvas }) => (
          <div>
            <Button onClick={triggerSave}>Save Canvas</Button>
            <div>{canvas}</div>
          </div>
        )}
      />
    )
}