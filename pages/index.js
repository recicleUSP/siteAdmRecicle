import Image from "next/image"

const NavBar = () => {
    const pages = [
        { name: "ENTRAR", path: "/auth/login", icon: "users" },
        { name: "CADASTRAR", path: "/manager/cadastrar", icon: "building" },
    ]

    return (
        <div className="flex justify-between py-5 items-center">
            <div className="h-full z-10">
                <Image width={296*0.7} height={58*0.7} priority src={"/image/logo.png"} alt="Logo Recicle++"/>
            </div>
            <div className="flex gap-10 text-white">
                {pages.map(el => {
                    return (
                        <div key={el.name}>
                            <a href={el.path} className="flex cursor-pointer gap-2 items-center">
                                <i className={`fa-solid fa-${el.icon}`}/>
                                <div>{el.name}</div>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default function Home() {
  return (
    <div className={"bg-background bg-image-home h-screen w-full overflow-hidden relative"}>     
      <div className={"container mx-auto max-w-normal h-full"}>
        <NavBar />
        <div className="grid grid-cols-12 gap-3 h-full items-center">
          <div className="col-span-7">
            <div className="text-verde-padrao font-extrabold drop-shadow-lg">
                <p className="text-2xl">FAÇA PARTE DA</p>
                <p className="text-7xl">MUDANÇA</p>
            </div>
            <div className="my-4 break-normal drop-shadow-2xl text-black">
              <p>Nós sabemos que você quer começar a reciclar, mas não </p>
              <p>sabe por onde começar.</p>
            </div>
            <div className="btn btn-yellow drop-shadow-2xl pt-5">
              <button>Baixar o App</button>
            </div>
         </div>
         <div className="col-span-5"/>
        </div>
      </div>  
      <div className="col-span-5 flex relative">
            <div className="absolute bottom-0 right-10 h-510 w-800 ">
            <Image  width={"650"} height={"415"} priority src={"/image/lixos-reci.jpg"} alt="Lixos reciclagem"/></div>
        </div>  
    </div>
  )
}



