export const transformToDescription = (clazz) => (node, children) => {

    if ((/H[1-7]/).test(node.tagName)) {
        return (
            <h3 className={`${clazz}__title`}>
                {children}
            </h3>)
    } else if (node.tagName === 'P'){
        return <p className={`${clazz}__text`}>{children}</p>
    }
}