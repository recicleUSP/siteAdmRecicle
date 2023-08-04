import Image from "next/image"   
import { getSession } from "next-auth/react"
import Header from "../../estruturas/header"
import DadosInstitution  from "../../estruturas/dadosInstitution"

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const user = session.user;
    return { 
        props: { 
            user,
        },
    }
  }

export default function cadastrarInstitution({ user }) {
    return(
        <div className={"bg-background-light h-screen w-full overflow-hidden relative"}> 
            <div className="container lg:px-6 px-2 mx-auto max-w-normal h-full">
                <Header />
                <DadosInstitution type="cadastro" user={user}/>
               
            </div>
            {/* <div className="absolute bottom-0 left-0 hidden lg:block">
                <Image src="/image/cuidandomundo.svg" width={400} height={400} priority/>
            </div> */}
        </div>
    )
}