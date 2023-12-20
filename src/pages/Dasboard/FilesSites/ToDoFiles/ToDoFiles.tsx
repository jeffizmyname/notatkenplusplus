import CardElement from "../../../../components/CardElement";




export default function ToDoFiles() {
    return (
      <div>
        <div>
          <p>Dzisiaj</p>
          <div className="flex flex-row gap-5">
            <CardElement type="new"/>
            <CardElement type="TODO"/>
            <CardElement type="TODO"/>
            <CardElement type="TODO"/>
          </div>
        </div>
        <div >
          <p>Wczoraj</p>
          <div className="flex flex-row gap-5">
            <CardElement type="TODO"/>
            <CardElement type="TODO"/>
            <CardElement type="TODO"/>
          </div>
        </div>
        <div>
          <p>1.1.2023</p>
          <div className="flex flex-row gap-5">
            <CardElement type="TODO"/>
            <CardElement type="TODO"/>
            <CardElement type="TODO"/>
          </div>
        </div>
      </div>
    )  
  }