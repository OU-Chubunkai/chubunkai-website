const Footer = () => {
    return (
        <footer className="bg-gray-200 text-gray-600 py-4 text-center">
            <div className="container mx-auto">
                <p>&copy; {new Date().getFullYear()} Chubunkai. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;