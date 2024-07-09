import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
export default function ToggleTheme() {
    const htmlElement = document.getElementsByTagName('html')[0];

    const handleToggle = () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
            toast('Theme changed to light mode')
        } else {
            htmlElement.classList.remove('light');
            htmlElement.classList.add('dark');
            toast('Theme changed to dark mode')
        }
    };

    return (

        <Button size='icon' onClick={handleToggle}>
            {htmlElement.classList.contains('dark') ? <SunIcon /> : <MoonIcon />} </Button>
    );
}