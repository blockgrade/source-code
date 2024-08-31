import { ethers } from 'ethers';

const Register = ({state}) => {
    const submitGradeDocument = async (event) => {
        event.preventDefault();
        const { contract } = state;
        const student = document.querySelector("#student").value;
        const discipline = document.querySelector("#discipline").value;
        const grade = document.querySelector("#grade").value;
        const file = document.querySelector("#file").value;

        const gradeValue = ethers.toBigInt(Math.round(parseFloat(grade) * 100));

        const amount = { value: ethers.parseEther('0.001') };
        const transaction = await contract.submitGradeWithFee(student, discipline, gradeValue, file, amount);
        await transaction.wait();
        console.log('Transaction is successful');
    };

    return (
        <>
            <form onSubmit={submitGradeDocument}>
                <input id="student"></input>
                <input id="discipline"></input>
                <input id="grade"></input>
                <input id="file"></input>
                <button>Registrar</button>
            </form>
        </>
    )
};

export default Register;
// file: 0x1234567890123456789012345678901234567890