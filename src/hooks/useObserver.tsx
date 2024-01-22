import  { useEffect, useState } from 'react'
type Props = {
  parentId: string
}
const useObserver = ({parentId}:Props) => {
  const [visibleElement, setVisibleElement] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    if(!parentId) {
      console.log('parent is null')
      return
    }
    const parent = document.getElementById(parentId)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          setVisibleElement(entry.target as HTMLDivElement)
        }
      })
    }, {threshold:0.5, root: parent});

    const children = Array.from(parent?.children || []);
    children.forEach(child=>observer.observe(child))
    return ()=>{
      children.forEach(child=>observer.unobserve(child))
    }
  })
  return { visibleElement,setVisibleElement }
}

export default useObserver