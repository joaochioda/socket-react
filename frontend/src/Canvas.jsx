import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const { draw, users, ...rest } = props
    const canvasRef = useRef(null)
    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let animationFrameId
        const render = () => {
            draw(context, users[0], users[1])
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw, users])

    return <canvas ref={canvasRef} {...rest} width={600} height={600} />
}

export default Canvas