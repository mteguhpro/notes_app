export const logout = () => {
    window.localStorage.removeItem("jwtToken");
    window.location.href = '/login' //BELUM MENEMUKAN ALTERNATIF SELAIN window.location. 
}