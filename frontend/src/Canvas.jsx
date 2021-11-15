import React, { useRef, useEffect } from 'react'

const Canvas = props => {

    const { draw, users, handleKeyDown, ...rest } = props
    const canvasRef = useRef(null)
    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let animationFrameId
        const render = () => {
            draw(context, users[0], users[1], users[2])
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw, users])

    return <canvas ref={canvasRef} {...rest} width={600} height={600} onKeyDown={(e) => handleKeyDown(e.key)} tabIndex={1} />
}

export default Canvas